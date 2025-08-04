// Go Get Hire - Hostinger Server Configuration
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

// Initialize Next.js app
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Parse the request URL
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl

      // Handle static assets
      if (pathname.startsWith('/_next/')) {
        await handle(req, res, parsedUrl)
        return
      }

      // Handle API routes
      if (pathname.startsWith('/api/')) {
        await handle(req, res, parsedUrl)
        return
      }

      // Handle all other routes
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('Internal Server Error')
    }
  })
  .once('error', (err) => {
    console.error('Server error:', err)
    process.exit(1)
  })
  .listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`)
    console.log('> Go Get Hire server started successfully')
  })
})

// Handle process termination
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully')
  process.exit(0)
})
