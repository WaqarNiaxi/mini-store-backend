import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "../prisma/client";
import { createAuthMiddleware } from "better-auth/api";


export const auth = betterAuth({
  experimental: { joins: true },
 emailAndPassword:{
    enabled:true,
    // registration: true,
  },
  
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),


     hooks: {
        after: createAuthMiddleware(async (ctx) => {
            if(ctx.path.startsWith("/sign-up")){
                const newSession = ctx.context.newSession;
                if(newSession){
                   
                     await prisma.wallet.create({
          data: {
            userId: newSession.user.id,
            balance: 1000,
          },
        });

                }
            }
        }),
    },


});