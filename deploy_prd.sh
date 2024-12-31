aws s3 cp dysonswarm.html s3://compellingsciencefiction.com/games/dysonswarm.html
aws s3 cp rocketLaunch.js s3://compellingsciencefiction.com/games/rocketLaunch.js
aws s3 cp matterStreaming.js s3://compellingsciencefiction.com/games/matterStreaming.js
aws s3 cp satellites.js s3://compellingsciencefiction.com/games/satellites.js
aws s3 cp buttonFunctions.js s3://compellingsciencefiction.com/games/buttonFunctions.js
aws s3 cp futureViz.js s3://compellingsciencefiction.com/games/futureViz.js
aws cloudfront create-invalidation --distribution-id E4NT2SXMIK6MK --paths "/games/dysonswarm.html" "/games/rocketLaunch.js" "/games/matterStreaming.js" "/games/satellites.js" "/games/buttonFunctions.js" "/games/futureViz.js"
