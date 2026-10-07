import { betterAuth, string } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { Resend } from "resend";

const client = new MongoClient(process.env.MONGO_DB_URL as string);
const db = client.db("bangla-news-db");

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      void resend.emails.send({
        from: "BanglaNews24 <onboarding@resend.dev>",
        to: user.email,
        subject: "পাসওয়ার্ড পরিবর্তন করুন — BanglaNews24",
        html: `
      <!DOCTYPE html>
      <html lang="bn">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>পাসওয়ার্ড পরিবর্তন করুন</title>
        </head>

        <body
          style="
            margin: 0;
            padding: 0;
            background-color: #fcfcfc;
            font-family: Arial, Helvetica, sans-serif;
            color: #111827;
          "
        >
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="background-color: #fcfcfc; padding: 40px 15px;"
          >
            <tr>
              <td align="center">

                <!-- Main Container -->
                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="
                    max-width: 520px;
                    background-color: #ffffff;
                    border: 1px solid #eeeeee;
                    border-radius: 12px;
                    overflow: hidden;
                  "
                >

                  <!-- Header -->
                  <tr>
                    <td
                      align="center"
                      style="
                        background: linear-gradient(
                          135deg,
                          #b80000,
                          #960000
                        );
                        padding: 32px 25px;
                      "
                    >
                      <h1
                        style="
                          margin: 0;
                          color: #ffffff;
                          font-size: 28px;
                          font-weight: 700;
                          letter-spacing: 0.3px;
                        "
                      >
                        BanglaNews24
                      </h1>

                      <p
                        style="
                          margin: 8px 0 0;
                          color: #ffe5e5;
                          font-size: 14px;
                        "
                      >
                        আপনার বিশ্বস্ত সংবাদ সঙ্গী
                      </p>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 35px 30px 30px;">

                      <h2
                        style="
                          margin: 0 0 14px;
                          color: #111827;
                          font-size: 22px;
                          text-align: center;
                        "
                      >
                        পাসওয়ার্ড পরিবর্তন করুন
                      </h2>

                      <p
                        style="
                          margin: 0 0 24px;
                          color: #4b5563;
                          font-size: 15px;
                          line-height: 1.7;
                          text-align: center;
                        "
                      >
                        আপনার BanglaNews24 অ্যাকাউন্টের পাসওয়ার্ড পরিবর্তনের
                        জন্য নিচের বাটনে ক্লিক করুন।
                      </p>

                      <!-- Button -->
                      <table
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                      >
                        <tr>
                          <td align="center">
                            <a
                              href="${url}"
                              style="
                                display: inline-block;
                                background-color: #cc0000;
                                color: #ffffff;
                                text-decoration: none;
                                font-size: 15px;
                                font-weight: 600;
                                padding: 13px 28px;
                                border-radius: 7px;
                              "
                            >
                              পাসওয়ার্ড পরিবর্তন করুন
                            </a>
                          </td>
                        </tr>
                      </table>

                      <!-- Fallback Link -->
                      <p
                        style="
                          margin: 26px 0 0;
                          font-size: 13px;
                          line-height: 1.6;
                          color: #9ca3af;
                          text-align: center;
                        "
                      >
                        বাটনে ক্লিক করতে সমস্যা হলে
                        <a
                          href="${url}"
                          style="
                            color: #b80000;
                            text-decoration: underline;
                            font-weight: 600;
                          "
                        >
                          এখানে ক্লিক করুন
                        </a>
                        ।
                      </p>

                      <!-- Warning -->
                      <div
                        style="
                          margin-top: 28px;
                          padding: 14px 16px;
                          background-color: #fff7f7;
                          border-left: 3px solid #b80000;
                          border-radius: 4px;
                        "
                      >
                        <p
                          style="
                            margin: 0;
                            color: #6b7280;
                            font-size: 13px;
                            line-height: 1.6;
                          "
                        >
                          আপনি যদি পাসওয়ার্ড পরিবর্তনের অনুরোধ না করে থাকেন,
                          তাহলে এই ইমেইলটি উপেক্ষা করুন। আপনার অ্যাকাউন্ট
                          নিরাপদ থাকবে।
                        </p>
                      </div>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td
                      align="center"
                      style="
                        padding: 20px 25px;
                        background-color: #fafafa;
                        border-top: 1px solid #eeeeee;
                      "
                    >
                      <p
                        style="
                          margin: 0;
                          color: #9ca3af;
                          font-size: 12px;
                          line-height: 1.6;
                        "
                      >
                        এই ইমেইলটি স্বয়ংক্রিয়ভাবে পাঠানো হয়েছে।
                        <br />
                        © BanglaNews24. সর্বস্বত্ব সংরক্ষিত।
                      </p>
                    </td>
                  </tr>

                </table>

              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET as string,
    },
  },
  trustedOrigins: ["http://localhost:3000", "http://192.168.0.104:3000"],
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      void resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "আপনার ইমেইল যাচাই করুন",
        html: `
      <!DOCTYPE html>
      <html lang="bn">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Email Verification</title>
        </head>

        <body
          style="
            margin: 0;
            padding: 0;
            background-color: #fcfcfc;
            font-family: Arial, Helvetica, sans-serif;
            color: #1f2937;
          "
        >
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="background-color: #fcfcfc; padding: 40px 15px;"
          >
            <tr>
              <td align="center">

                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="
                    max-width: 560px;
                    background-color: #ffffff;
                    border: 1px solid #eeeeee;
                    border-radius: 12px;
                    overflow: hidden;
                  "
                >

                  <!-- Header -->
                  <tr>
                    <td
                      align="center"
                      style="
                        background-color: #b80000;
                        padding: 28px 20px;
                      "
                    >
                      <h1
                        style="
                          margin: 0;
                          color: #ffffff;
                          font-size: 28px;
                          font-weight: 700;
                          letter-spacing: 0.5px;
                        "
                      >
                        Bangla News 24
                      </h1>

                      <p
                        style="
                          margin: 8px 0 0;
                          color: #ffe5e5;
                          font-size: 14px;
                        "
                      >
                        সত্য খবর, আপনার কাছে
                      </p>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 35px;">

                      <h2
                        style="
                          margin: 0 0 15px;
                          color: #111827;
                          font-size: 24px;
                          line-height: 1.4;
                        "
                      >
                        ইমেইল যাচাই করুন
                      </h2>

                      <p
                        style="
                          margin: 0 0 12px;
                          font-size: 16px;
                          line-height: 1.7;
                          color: #374151;
                        "
                      >
                        হ্যালো ${user.name || "ব্যবহারকারী"},
                      </p>

                      <p
                        style="
                          margin: 0 0 25px;
                          font-size: 15px;
                          line-height: 1.8;
                          color: #6b7280;
                        "
                      >
                        আপনার অ্যাকাউন্ট সক্রিয় করতে এবং আপনার ইমেইল
                        ঠিকানাটি যাচাই করতে নিচের বাটনে ক্লিক করুন।
                      </p>

                      <!-- Button -->
                      <table
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        width="100%"
                      >
                        <tr>
                          <td align="center">
                            <a
                              href="${url}"
                              style="
                                display: inline-block;
                                background-color: #cc0000;
                                color: #ffffff;
                                text-decoration: none;
                                padding: 13px 30px;
                                border-radius: 7px;
                                font-size: 15px;
                                font-weight: 600;
                              "
                            >
                              ইমেইল যাচাই করুন
                            </a>
                          </td>
                        </tr>
                      </table>

                     <p
                      style="
                        margin: 28px 0 0;
                        font-size: 13px;
                        line-height: 1.6;
                        color: #9ca3af;
                        text-align: center;
                      "
                    >
                      বাটনে ক্লিক করতে সমস্যা হলে
                      <a
                        href="${url}"
                        style="
                          color: #b80000;
                          text-decoration: underline;
                          font-weight: 600;
                        "
                      >
                        এখানে ক্লিক করুন
                      </a>
                      ।
                    </p>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td
                      align="center"
                      style="
                        background-color: #fafafa;
                        border-top: 1px solid #eeeeee;
                        padding: 22px 25px;
                      "
                    >
                      <p
                        style="
                          margin: 0 0 6px;
                          font-size: 12px;
                          color: #9ca3af;
                        "
                      >
                        আপনি এই অনুরোধটি না করলে এই ইমেইলটি উপেক্ষা করুন।
                      </p>

                      <p
                        style="
                          margin: 0;
                          font-size: 12px;
                          color: #b0b0b0;
                        "
                      >
                        © ${new Date().getFullYear()} Bangla News 24
                      </p>
                    </td>
                  </tr>

                </table>

              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
      });
    },
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600,
  },
});
