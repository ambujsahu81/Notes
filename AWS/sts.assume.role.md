# AWS Secure Token Service (STS)  📕

### importance

To fix following error
```console 
  Boto3 Error: botocore.exceptions.NoCredentialsError: Unable to locate credentials
``` 

### where does Boto3 look for credentials

The order in which Boto3 searches for credentials is:

 -- Passing credentials as parameters in the boto.client() method

 -- Passing credentials as parameters when creating a Session object

 -- Environment variables

 -- Shared credential file (~/.aws/credentials)

 -- AWS config file (~/.aws/config)

 -- Assume Role provider

 -- Boto2 config file (/etc/boto.cfg and ~/.boto)

 -- Instance metadata service on an Amazon EC2 instance that has an IAM role configured.

 ### Internet proxy setting issue

 you can also check if there is any proxy issue which is blocking the boto3 from receiving the credentials

 to check the credentials set on the EC2 instance open power shell and run the following commands

```console
  Invoke-webRequest -URI https://169.254.169.254/latest/meta-data/identity-credentials/ec2/security-credentials/ec2-instance

  netsh winhttp show proxy
```

### Using STS to resolve Boto3 Error


> By default, AWS Security Token Service (AWS STS) is available as a global service.
> Security Token Service (STS) enables you to request temporary, limited-privilege credentials for users. 

```console
import boto3

client = boto3.client('sts')
client.assume_role(**kwargs)

# above command returns a set of temporary security credentials that you can use to access Amazon Web Services resources.These temporary credentials consist of an access key ID, a secret access key, and a security token.


# Call the assume_role method of the STSConnection object and pass the role
# ARN and a role session name.
assumed_role_object=sts_client.assume_role(
    RoleArn="arn:aws:iam::account-of-role-to-assume:role/name-of-role",
    RoleSessionName="AssumeRoleSession1"
)

# From the response that contains the assumed role, get the temporary 
# credentials that can be used to make subsequent API calls
credentials=assumed_role_object['Credentials']
```

To allow a user to assume a role in the same account, you can do either of the following:

 1) Attach a policy to the user that allows the user to call AssumeRole (as long as the role’s trust policy trusts    
   the account).

 2) Add the user as a principal directly in the role’s trust policy.

### Using AWS configure file to resolve Boto3 error
 The credentials and config file are updated when you run the command aws configure. The credentials file is located at ~/.aws/credentials on Linux or macOS, or at C:\Users\USERNAME\.aws\credentials on Windows

### Using OS envirnoment variables to resolve Boto3 error

It is always good to get credentials from os environment

To set Environment variables run the following commands in terminal

```console
 #if linux or mac
 $ export AWS_ACCESS_KEY="aws_access_key"
 $ export AWS_SECRET_KEY="aws_secret_key"

 #if windows
 c:System\> set AWS_ACCESS_KEY="aws_access_key"
 c:System\> set AWS_SECRET_KEY="aws_secret_key"
```

