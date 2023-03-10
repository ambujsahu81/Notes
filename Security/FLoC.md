# Federated Learning of Cohorts 📕

### importance
  FLoC provides a privacy-preserving mechanism for interest-based ad selection.
  It aims to give advertisers a way of targeting ads without exposing details on individual users.

## core principles   
  The idea is that groups of people with common interests could replace individual identifiers.
  This approach effectively hides individuals 'in the crowd'
  and uses on-device processing to keep a person’s web history private on the browser.
  These groups (or "cohorts") are generated through algorithms (that's the "federated learning" bit).
                            
## why FLoC was introduced             
  cookie tracking has become more and more invasive. Embedded, far-reaching trackers known as third-party cookies keep 
  tabs on users as they move across multiple websites, while advertisers also use an invasive technique called 
  fingerprinting to know who you are even with anti-tracking measures turned on (through your use of fonts,
  or your computer's ID, your connected Bluetooth devices or other means).

  Google would prefer to continue to allow targeted advertising while keeping users anonymous, and it wants to replace 
  cookies with FLoC by 2022.

## FLoC API 
```js
  const { id, version } = await document.interestCohort();
  console.log('FLoC ID:', id);
  console.log('FLoC version:', version);
```

## Private browsing / Incognito mode
  The interest cohort computation algorithm and the `interestCohort()` API methods are applicable to the private browsing 
  mode as well.

## Concern about FLoC
  FLoC is a black box, Google will have the ability to tweak the FLoC algorithms to their benefit.
  Cross-context exposure, This API democratizes access to some information about an individual’s general browsing history 
  (and thus, general interests) to any site that opts into it.
  … Sites that know a person’s PII (e.g., when people sign in using their email address) could record and reveal their 
  cohort. This means that information about an individual's interests may eventually become public.
  Trackers may be able to reverse-engineer the cohort-assignment algorithm to determine that any user who belongs to a 
  specific cohort probably or definitely visited specific sites. 

                        

