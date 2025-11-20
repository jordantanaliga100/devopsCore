import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import app from '../src/app'

describe('Endpoints', () => {
  describe('GET /', () => {
    it('should return Alive 🚀', async () => {
      const res = await request(app).get('/').expect(200)
      expect(res.body.msg).toBe('Alive 🚀')
    })
  })

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health').expect(200)
      expect(response.body).toHaveProperty('status', 'OK')
      expect(response.body).toHaveProperty('timestamp')
      expect(response.body).toHaveProperty('uptime')
    })
  })

  describe('GET /nonexistent', () => {
    it('should return 404 for non-existent routes', async () => {
      const res = await request(app).get('/nonexsistent')
      expect(res.status).toBe(404)
      expect(res.text).toMatch(/route does not exist/i)
      expect(res.text).toMatch(/go back/i)
    })
  })
})
