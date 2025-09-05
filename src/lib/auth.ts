import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { twoFactor } from 'better-auth/plugins'
import { passkey } from 'better-auth/plugins/passkey'

import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '@/lib/db/db'
import * as schema from '@/lib/db/schema'

import { env } from '@/env'
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
        schema: schema,
        usePlural: true,
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        nextCookies(),
        twoFactor(),
        passkey()
    ],
    socialProviders: {
        discord: {
            clientId: env.DISCORD_CLIENT_ID!,
            clientSecret: env.DISCORD_CLIENT_SECRET!,
        }
    }
});