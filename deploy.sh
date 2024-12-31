aws s3 cp dysonswarm.html s3://compellingsciencefiction.com/test_facility/dysonswarm.html
aws s3 cp rocketLaunch.js s3://compellingsciencefiction.com/test_facility/rocketLaunch.js
aws s3 cp matterStreaming.js s3://compellingsciencefiction.com/test_facility/matterStreaming.js
aws s3 cp satellites.js s3://compellingsciencefiction.com/test_facility/satellites.js
aws s3 cp buttonFunctions.js s3://compellingsciencefiction.com/test_facility/buttonFunctions.js
aws s3 cp futureViz.js s3://compellingsciencefiction.com/test_facility/futureViz.js
aws cloudfront create-invalidation --distribution-id E4NT2SXMIK6MK --paths "/test_facility/dysonswarm.html" "/test_facility/rocketLaunch.js" "/test_facility/matterStreaming.js" "/test_facility/satellites.js" "/test_facility/buttonFunctions.js" "/test_facility/futureViz.js"
