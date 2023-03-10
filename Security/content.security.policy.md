# Content-Security-Policy 📕

### importance
  An added layer of security that helps to detect and mitigate certain types of attacks,
  including Cross-Site Scripting (XSS) and data injection attacks.

## ways to implement     
  Can be added by configuring the web server to return the Content-Security-Policy HTTP header.
  The `<meta>` element can be used to configure a policy. For example : -

  ```html
      <meta http-equiv="Content-Security-Policy"
            content="default-src 'self'; img-src https://*; child-src 'none';" />
  ```
                            
## Few example               
  1. `Content-Security-Policy: default-src https://onlinebanking.example.com`
  
  The server permits access only to documents being loaded specifically over HTTPS through the
  single origin onlinebanking.example.com.

  2. `Content-Security-Policy: default-src:none  script-src:hash/nonceValue style-src:hash/nonceValue`
  
  This allow's page to only load scripts and style which contain that particular nonce/hash attribute.


                        

