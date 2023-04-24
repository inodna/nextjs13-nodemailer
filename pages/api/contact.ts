import { mailOptions, transporter } from "@/config/nodemailer";
import { Inputs } from "@/types/types";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Inputs | Data>
) => {
  if (req.method === "POST") {
    const data = req.body;
    if (!data.firstName || !data.lastName) {
      return res.status(400).json({ message: "Dataaaa" });
    }

    try {
      console.log(req.body);
      await transporter.sendMail({
        ...mailOptions,
        subject: data.firstName,
        text: "This is a test screen",
        html: "<p>Hello from the HTML</p>",
      });

      return res.status(200).json({ message: "BIEN!" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  res.status(400).json({ message: "Bad request" });
};

export default handler;
