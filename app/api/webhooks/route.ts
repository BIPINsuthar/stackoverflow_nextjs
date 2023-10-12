import type { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { WebhookRequiredHeaders } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";

import * as Actions from "../../.././lib/actions";
import { NextResponse } from "next/server";

const webhookSecret: string = process.env.WEBHOOK_SECRET ?? "";

export default async function handler(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse
) {
  const payload = JSON.stringify(req.body);
  const headers = req.headers;
  // Create a new Webhook instance with your webhook secret
  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;
  try {
    // Verify the webhook payload and headers
    evt = wh.verify(payload, headers) as WebhookEvent;
  } catch (_) {
    // If the verification fails, return a 400 error
    return res.status(400).json({});
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, image_url, username, first_name, last_name } =
      evt.data;

    const mongoUser = await Actions.createUser({
      clerkId: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      picture: image_url,
      username: username ?? "",
    });
    return NextResponse.json({ message: "OK", user: mongoUser });
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, image_url, username, first_name, last_name } =
      evt.data;

    const mongoUser = await Actions.updateUser({
      clearkId: id,
      path: `profile/${id}`,
      updateData: {
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
        picture: image_url,
        username: username ?? "",
      },
    });

    return NextResponse.json({ message: "OK", user: mongoUser });
  }

  if (eventType == "user.deleted") {
    const { id } = evt.data;
    const mongoDeletedUser = await Actions.deleteUser(id!);

    return NextResponse.json({ message: "OK", user: mongoDeletedUser });
  }

  return new Response("", {
    status: 201,
  });
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};
