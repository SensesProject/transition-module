labels () {
  const { data } = this
  // first create a subset of our data with the things we actually need
  const labels = data.map(d => {
    // put in everything you'll need
    // you might need to acces y in a different way
    // (e.g. if you have a timeseries it might be something
    // like d[2050].y)
    return {
      label: d.label,
      y: d.y
    }
  }).sort((a, b) => a.y - b.y) // it's important to sort our data by their y position!!!
  // get an even simpler array of just the y positions
  const positions = points.map(p => p.y)
  // set the minimum distance you want to have
  const minDist = 14
  // calculate the differences, by using filter() to get an array which is
  // the same as positions, but without the first item (i > 0). Then those values are
  // subtracted by the value that comes before them (y - positions[y])
  let diffs = positions.filter((y, i) => i > 0).map((y, i) => y - positions[i])
  // now move those things for as long as any of those differences is smaller than minDist
  while (diffs.find(d => d < minDist) != null) {
    // if there is a difference to small, iterate over them
    diffs.forEach((d, i) => {
      // if this is difference is to small…
      if (d < minDist) {
        // move the first position up and the one after that down
        // we move them by whatever is bigger. the minimum value to reach the
        // required distance or 2 pixels
        // (you could just move them by one or two pixels, but depending on the amount of
        // labels, this can take a while and slow things down. Also steps should not be to
        // small as it helps to have some extra space to wiggle)
        positions[i] = positions[i] - Math.max((minDist - d) / 2, 2)
        positions[i + 1] = positions[i + 1] + Math.max((minDist - d) / 2, 2)
        // Now we can set some boundaries, if we for example don't want a label to be
        // lower/higher than a specific value…
        if (positions[i + 1] >= maxY) {
          positions[i + 1] = maxY
        }
      }
    })
    // since we moved things around, it can be that labels which did not overlap before
    // do now. so we have to recalculate the diffs, and stay in this while-loop until everything
    // is fine
    diffs = positions.filter((y, i) => i > 0).map((y, i) => y - positions[i])
  }
  // then, we can apply the y positions back to the array from before
  // (if we still need the old y value, we can use y2 or so…)
  labels.forEach((l, i) => {
    l.y2 = positions[i]
  })
  return points
}
