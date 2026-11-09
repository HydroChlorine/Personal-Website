/* Original local miniature. Idea: dimden.dev's WebTiles miniature; no borrowed code or artwork. */
;(function () {
  'use strict'
  var canvas = document.getElementById('sky')
  var ctx = canvas.getContext('2d')
  if (!ctx) return
  var scene = 'home',
    weather = 0,
    time = 0,
    last = 0,
    rockets = [],
    sparks = []
  var motionChoice = /motion=(playing|paused)/.exec(location.search)
  var playing = motionChoice
    ? motionChoice[1] === 'playing'
    : !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  var weatherNames = ['clear', 'rain', 'snow']
  var labels = {
    home: 'Home',
    chemistry: 'Chemistry',
    mathematics: 'Math',
    'computer-science': 'CS',
  }
  var colors = ['#9dd1da', '#e2b875', '#afcbb6', '#ce8c86']
  var tabs = document.querySelectorAll('[data-scene]')
  var status = document.getElementById('status')
  function rect(x, y, w, h, color) {
    ctx.fillStyle = color
    ctx.fillRect(Math.round(x), Math.round(y), w, h)
  }
  function line(x0, y0, x1, y1, color) {
    var steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1),
      i
    for (i = 0; i <= steps; i++)
      rect(
        x0 + ((x1 - x0) * i) / steps,
        y0 + ((y1 - y0) * i) / steps,
        1,
        1,
        color,
      )
  }
  function outline(x, y, w, h, col) {
    line(x, y, x + w, y, col)
    line(x + w, y, x + w, y + h, col)
    line(x + w, y + h, x, y + h, col)
    line(x, y + h, x, y, col)
  }
  function home() {
    rect(0, 60, 125, 15, '#132331')
    rect(15, 32, 59, 28, '#243e50')
    rect(37, 25, 15, 7, '#355668')
    line(14, 31, 75, 31, '#afcbb6')
    line(37, 24, 52, 24, '#afcbb6')
    for (var x = 20; x < 72; x += 8)
      for (var y = 37; y < 57; y += 8)
        rect(x, y, 2, 4, (x + y) % 3 ? '#6f929f' : '#e2b875')
    rect(76, 18, 35, 42, '#162638')
    outline(76, 18, 35, 42, '#6f929f')
    for (var gx = 82; gx < 110; gx += 7) line(gx, 19, gx, 59, '#355668')
    for (var gy = 27; gy < 60; gy += 8) line(77, gy, 110, gy, '#355668')
    rect(42, 60, 9, 3, '#6f929f')
    rect(38, 63, 9, 3, '#6f929f')
    rect(34, 66, 9, 3, '#6f929f')
  }
  function chemistry() {
    rect(0, 65, 125, 10, '#132331')
    rect(34, 63, 55, 4, '#355668')
    rect(39, 58, 45, 5, '#243e50')
    outline(40, 49, 42, 10, '#6f929f')
    line(57, 18, 57, 36, '#9dd1da')
    line(67, 18, 67, 36, '#9dd1da')
    line(57, 36, 49, 44, '#9dd1da')
    line(67, 36, 75, 44, '#9dd1da')
    outline(49, 44, 26, 13, '#9dd1da')
    rect(50, 49, 25, 7, '#355668')
    for (var i = 0; i < 5; i++)
      rect(53 + i * 4, 50 + Math.sin(time * 2 + i) * 2, 2, 2, '#afcbb6')
    rect(55, 8, 14, 8, '#6f929f')
    rect(57, 5, 10, 3, '#6f929f')
    line(62, 16, 62, 19, '#e2b875')
  }
  function mathematics() {
    outline(15, 12, 96, 49, '#355668')
    for (var x = 15; x <= 111; x += 16) line(x, 12, x, 61, '#1c3445')
    for (var y = 12; y <= 61; y += 12) line(15, y, 111, y, '#1c3445')
    var progress = playing ? Math.min(1, (time % 5) / 2) : 1
    for (var i = 0; i <= Math.floor(96 * progress); i++) {
      var u = i / 48 - 1
      rect(15 + i, 35 - 20, 1, 1, colors[0])
      rect(15 + i, 35 - u * 20, 1, 1, colors[1])
      rect(15 + i, 35 - (3 * u * u - 1) * 10, 1, 1, colors[2])
    }
  }
  function computerScience() {
    var boxes = [
      [12, 30, 24, 25],
      [51, 25, 25, 35],
      [92, 30, 22, 25],
    ]
    for (var i = 0; i < boxes.length; i++) {
      var b = boxes[i]
      rect(b[0], b[1], b[2], b[3], '#132331')
      outline(b[0], b[1], b[2], b[3], colors[i])
      for (var y = b[1] + 6; y < b[1] + b[3] - 3; y += 6)
        rect(b[0] + 4, y, b[2] - 8, 1, '#355668')
    }
    line(36, 43, 51, 43, '#355668')
    line(76, 43, 92, 43, '#355668')
    var xx = 37 + ((time * 10) % 54)
    rect(xx, 42, 3, 3, xx < 65 ? colors[1] : colors[2])
  }
  function updateStatus() {
    status.textContent =
      labels[scene] + ' · ' + (playing ? 'click the sky' : 'motion paused')
    canvas.setAttribute(
      'aria-label',
      labels[scene] +
        ' miniature. ' +
        (playing
          ? 'Click or press Enter to launch a firework.'
          : 'Motion is paused.'),
    )
    canvas.setAttribute('aria-disabled', playing ? 'false' : 'true')
    for (var i = 0; i < tabs.length; i++)
      tabs[i].setAttribute(
        'aria-pressed',
        tabs[i].getAttribute('data-scene') === scene ? 'true' : 'false',
      )
  }
  function render(dt) {
    ctx.save()
    ctx.scale(2, 2)
    rect(0, 0, 125, 75, '#080f1c')
    for (var j = 0; j < 18; j++)
      rect(
        (j * 37 + 11) % 125,
        (j * 19 + 7) % 54,
        1,
        1,
        j % 3 ? '#355668' : '#6f929f',
      )
    rect(106, 7, 5, 7, '#6f929f')
    rect(109, 5, 4, 7, '#080f1c')
    if (scene === 'home') home()
    else if (scene === 'chemistry') chemistry()
    else if (scene === 'mathematics') mathematics()
    else computerScience()
    if (weather)
      for (var k = 0; k < 26; k++) {
        var px = (k * 29 + Math.sin(time + k) * 2) % 125,
          py = (k * 13 + time * (weather === 1 ? 23 : 7)) % 75
        rect(px, py, 1, weather === 1 ? 3 : 1, k % 4 ? '#355668' : '#9bacbb')
      }
    for (var r = rockets.length - 1; r >= 0; r--) {
      var rocket = rockets[r]
      rocket.age += dt
      var a = Math.min(0.65, rocket.age)
      var rx = 62 + rocket.vx * a,
        ry = 73 + rocket.vy * a + 22.5 * a * a
      rect(rx, ry, 1, 2, '#e2b875')
      if (rocket.age >= 0.65) {
        for (var p = 0; p < 36; p++) {
          var angle = (p * Math.PI * 2) / 36,
            velocity = 8 + Math.random() * 17
          sparks.push({
            x: rocket.x,
            y: rocket.y,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity,
            age: 0,
            color: colors[p % 4],
          })
        }
        rockets.splice(r, 1)
      }
    }
    for (var s = sparks.length - 1; s >= 0; s--) {
      var spark = sparks[s]
      spark.age += dt
      spark.vy += 18 * dt
      spark.x += spark.vx * dt
      spark.y += spark.vy * dt
      ctx.globalAlpha = Math.max(0, 1 - spark.age / 1.2)
      rect(spark.x, spark.y, 1, 1, spark.color)
      if (spark.age > 1.2) sparks.splice(s, 1)
    }
    ctx.globalAlpha = 1
    ctx.restore()
  }
  function launch(x, y) {
    if (!playing || rockets.length >= 6 || sparks.length > 400) return
    x = Math.max(2, Math.min(123, x))
    y = Math.max(3, Math.min(70, y))
    status.textContent = labels[scene] + ' · firework launched'
    rockets.push({
      x: x,
      y: y,
      age: 0,
      vx: (x - 62) / 0.65,
      vy: (y - 73 - 22.5 * 0.65 * 0.65) / 0.65,
    })
  }
  canvas.addEventListener('click', function (e) {
    var b = canvas.getBoundingClientRect()
    launch(
      ((e.clientX - b.left) / b.width) * 125,
      ((e.clientY - b.top) / b.height) * 75,
    )
  })
  canvas.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      launch(62, 25)
    }
  })
  for (var i = 0; i < tabs.length; i++)
    (function (tab) {
      tab.addEventListener('click', function () {
        scene = tab.getAttribute('data-scene')
        updateStatus()
        render(0)
      })
    })(tabs[i])
  document.getElementById('home').addEventListener('click', function () {
    scene = 'home'
    updateStatus()
    render(0)
  })
  document.getElementById('weather').addEventListener('click', function () {
    weather = (weather + 1) % 3
    this.textContent = 'Sky: ' + weatherNames[weather]
    this.setAttribute(
      'aria-label',
      'Change miniature weather. Currently ' + weatherNames[weather] + '.',
    )
    render(0)
  })
  document.addEventListener('visibilitychange', function () {
    last = 0
  })
  function frame(now) {
    var dt = last ? Math.min(0.035, (now - last) / 1000) : 0
    last = now
    if (!document.hidden) {
      time += dt
      render(dt)
    }
    window.requestAnimationFrame(frame)
  }
  updateStatus()
  render(0)
  if (playing) window.requestAnimationFrame(frame)
})()
