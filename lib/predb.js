import predb from 'predb-scraper';

import { getColors } from './utils';

let releases = {
  Movies: { count: 0, subs: { SD: 0, HD: 0, Discs: 0 } },
  TV: { count: 0, subs: { SD: 0, HD: 0, Discs: 0 } },
  Music: { count: 0, subs: { Audio: 0, Videos: 0, Discs: 0 } },
  Games: { count: 0, subs: { PC: 0, Xbox: 0, Playstation: 0, Nintendo: 0 } },
  Apps: { count: 0, subs: { Windows: 0, Linux: 0, Mac: 0, Mobile: 0 } },
  Books: { count: 0, subs: { eBooks: 0, 'Audio Books': 0 } },
  XXX: { count: 0, subs: { Videos: 0, Images: 0 } },
  Dox: { count: 0, subs: {} },
  Unknown: { count: 0, subs: {} },
};
let releaseCache, lastId,
    startOfDay = new Date(),
    endOfDay = new Date();
startOfDay.setUTCHours(0, 0, 0, 0);
endOfDay.setUTCHours(24, 0, 0, 0);

function resetReleaseCount() {
  Object.keys(releases).forEach(release => {
    releases[release].count = 0;

    Object.keys(releases[release].subs).forEach(sub => {
      releases[release].subs[sub] = 0;
    })
  });
}

function isZeroDay(released) {
  if (released < startOfDay.getTime()) {
    return -1;
  } else if (released > endOfDay.getTime()) {
    return 1;
  }

  return 0;
}

function updateReleaseCount(newReleases) {
  let count;
  for (count = 0; count < newReleases.length; count++) {
    const release = newReleases[count],
          released = release.released * 1000,
          zeroDay = isZeroDay(released);

    if (zeroDay === 1) {
      startOfDay.setUTCHours(0, 0, 0, 0);
      endOfDay.setUTCHours(24, 0, 0, 0);
      resetReleaseCount();
    }

    if (zeroDay !== 0) {
      break;
    }

    releases[release.category.main].count++;

    if (release.category.sub) {
      releases[release.category.main].subs[release.category.sub]++;
    }
  };

  return count;
}

function formatReleaseCount() {
  let formatted = {};

  Object.keys(releases).forEach(cat => {
    if (!formatted.All) formatted.All = [];

    formatted.All.push({
      value: releases[cat].count,
      color: getColors()[cat].primary,
      //highlight: getColors[cat],
      label: cat,
      labels: [],
    });

    Object.keys(releases[cat].subs).forEach(sub => {
      if (!formatted[cat]) formatted[cat] = [];

      formatted[cat].push({
        value: releases[cat].subs[sub],
        color: getColors()[cat].secondary[sub],
        //highlight: getColors[cat],
        label: sub,
      });
    });
  });

  releaseCache = formatted;
  return formatted;
}

export function getReleaseCache() {
  return releaseCache;
}

export function get(next, page = 1) {
  let cb = (err, data) => {
    if (err) return next(err);

    if (page === 1) lastId = data.lastId;

    if (updateReleaseCount(data.releases) === data.releases.length) {
      return get(next, parseInt(data.currentPage) + 1);
    };

    return next(null, formatReleaseCount());
  };

  predb().get({ page }, cb);
}

export function getNew(next) {
  const options = { live: 1, lastid: lastId };
  let formatted;

  predb().get(options, (err, data) => {
    if (err) return next(err);

    if (data.releases.length > 0) {
      updateReleaseCount(data.releases);
      formatted = formatReleaseCount();
      lastId = data.lastId;
    }

    return next(null, formatted);
  });
}
