# minimal-repo-image-cdn

## Installation

```sh
yarn install --ignore-engines

```

> [!NOTE]
> [sharp docs](https://sharp.pixelplumbing.com/install) suggest that you should install with `--ignore-engines` for yarn v1

## Setup envs

Create a dotenv (.env) file following the `.env.example`

- [Managing access keys (console)](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)

```.env.example
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

AWS_REGION=

# AWS Cloudfront service
AWS_CLOUDFRONT_DOMAIN=

# AWS S3 service
AWS_S3_BUCKET_NAME=

```

## Setup AWS Services

- [Set up a CloudFront CDN for an S3 Bucket](https://www.youtube.com/watch?v=kbI7kRWAU-w)
- [CDN de alta disponibilidade na AWS com S3, CloudFront e Route53](https://tiagoboeing.medium.com/cdn-de-alta-disponibilidade-na-aws-com-s3-cloudfront-e-route53-d08da8fab0ab)
