/* global describe, it */
'use strict'
const { expect } = require('expect')
const process = require('child_process')
const path = require('path')
const utils = require('../lib/utils')
const bin = path.join(__dirname, '../bin/maildev')

describe('cli', () => {
  it('should shutdown with SIGTERM signal', (done) => {
    const maildev = process.spawn(bin)
    maildev.on('close', (code, signal) => {
      expect(signal).toBe('SIGTERM')
      done()
    })
    maildev.kill('SIGTERM')
  })

  it('should shutdown with SIGINT signal', (done) => {
    const maildev = process.spawn(bin)
    maildev.on('close', (code, signal) => {
      expect(signal).toBe('SIGINT')
      done()
    })
    maildev.kill('SIGINT')
  })

  it('should works with unknown arguments', (done) => {
    const maildev = process.spawn(bin, [`--${utils.makeId()}`])
    maildev.on('error', (err) => done(err))
    maildev.on('close', (code, signal) => {
      expect(signal).toBe(null)
      done()
    })
    setTimeout(() => {
      maildev.kill('SIGINT')
    }, 1000)
  })
})
