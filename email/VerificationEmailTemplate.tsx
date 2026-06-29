// Get the full source code, including the theme and Tailwind config:
// https://github.com/resend/react-email/tree/canary/apps/demo/emails

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from 'react-email';

import tailwindConfig from '../tailwind.config';

interface AWSVerifyEmailProps {
  verificationCode?: string;
  username?:string
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export default function VerifyEmail({
  verificationCode,
  username
}: AWSVerifyEmailProps) {
  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className="bg-white font-aws text-[#212121]">
          <Preview>AWS Email Verification</Preview>
          <Container className="p-5 mx-auto bg-[#eee]">
            <Section className="bg-white">
              <Section className="bg-[#252f3d] flex py-5 items-center justify-center">
                <Img
                  src={`${baseUrl}/static/aws-logo.png`}
                  width="75"
                  height="45"
                  alt="AWS's Logo"
                />
              </Section>
              <Section className="py-6.25 px-8.75">
                <Heading className="text-[#333] text-[20px] font-bold mb-3.75">
                  Verify your email address user : {username}
                </Heading>
                <Text className="text-[#333] text-[14px] leading-6 mt-6 mb-3.5 mx-0">
                  Thanks for starting the new AWS account creation process. We
                  want to make sure it's really you. Please enter the following
                  verification code when prompted. If you don&apos;t want to
                  create an account, you can ignore this message.
                </Text>
                <Section className="flex items-center justify-center">
                  <Text className="text-[#333] m-0 font-bold text-center text-[14px]">
                    Verification code
                  </Text>

                  <Text className="text-[#333] text-[36px] my-2.5 mx-0 font-bold text-center">
                    {verificationCode}
                  </Text>
                  <Text className="text-[#333] text-[14px] m-0 text-center">
                    (This code is valid for 10 minutes)
                  </Text>
                </Section>
              </Section>
              <Hr />
              <Section className="py-6.25 px-8.75">
                <Text className="text-[#333] text-[14px] m-0">
                  Amazon Web Services will never email you and ask you to
                  disclose or verify your password, credit card, or banking
                  account number.
                </Text>
              </Section>
            </Section>
            <Text className="text-[#333] text-[12px] my-6 mx-0 px-5 py-0">
              This message was produced and distributed by Amazon Web Services,
              Inc., 410 Terry Ave. North, Seattle, WA 98109. © 2022, Amazon Web
              Services, Inc.. All rights reserved. AWS is a registered trademark
              of{' '}
              <Link
                href="https://amazon.com"
                target="_blank"
                className="text-[#2754C5] underline text-[14px]"
              >
                Amazon.com
              </Link>
              , Inc. View our{' '}
              <Link
                href="https://amazon.com"
                target="_blank"
                className="text-[#2754C5] underline text-[14px]"
              >
                privacy policy
              </Link>
              .
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

VerifyEmail.PreviewProps = {
  verificationCode: '596853',
} satisfies AWSVerifyEmailProps;
