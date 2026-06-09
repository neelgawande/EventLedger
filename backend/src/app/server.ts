import express from 'express'
import dotenv from 'dotenv'
import app from './app.js'

import { env } from "../config/env.js"
import { connectDatabase } from "../config/database.js"

async function bootstrap() {
	await connectDatabase()

	app.listen(env.PORT,()=>{
		console.log(`Server running on port ${env.PORT}`)
	})
}

bootstrap()