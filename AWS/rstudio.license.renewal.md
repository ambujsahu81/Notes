
# RStudio license renewal in AWS RHEL EC2 Instance 📕

### importance

RStudio is an IDE for R, a programming language for statistical computing and graphics.
It is available in two formats: RStudio Desktop is a regular desktop application 
while RStudio Server runs on a remote server and allow accessing RStudio using a web browser. 

RStudio Connect provides a platform to deliver key insights to decision-makers, at the right time, in the right format. Connect supports a spectrum of data products, static or dynamic, developed in R and Python: Dashboards, Shiny applications, APIs, reports, and so much more

## Updating R Studio Connect Server License
R Studio Connect server is a paid product with a license that needs renewal from time to time.

There are serval ways to activate your license or to renew it. The best option is to connect with Posit
Customer support (support@posit.co) and get your activation or renewal process confirm from their 
team before actually executing any commands. These will give the support team head up and if faced any issue they can help to resolve it in less time which will make sure R Studio Connect server is not
down for long time.

## Online activation/ License renewal Process

 1 Login to R studio connect through putty
 2 Check the current status using following command

 ```console
  Sudo/opt/rstudio-connect/bin/license-manager status
 ```
 3 Get your product key/License key ready and  run following sets of commands

 ```console
  Sudo/opt/rstudio-connect/bin/license-manager deactivate

  Sudo/opt/rstudio-connect/bin/license-manager activate <product-key>

  Sudo systemctl stop rstudio-connect

  Sudo systemctl start rstudio-connect

  sudo/opt/rstudio-connect/bin/license-manager status
 ```
   