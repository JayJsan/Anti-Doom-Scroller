console.log('Content script loaded!');

const currentURL = window.location.href;
console.log('Current URL:', currentURL);

// ================== FUNCTIONS ==================

const handleYoutube = () => {
  console.log('Handling Youtube...');
  // initalise functions
  const onUrlChange = () => {
    console.log('URL changed!');

    // check if user is on shorts page
    if (handleYTShortsCheck()) {
      console.log('Shorts page detected!');
    } else {
      console.log('Not on shorts page.');
    }
  };

  const removeShortsNavigationBtns = () => {
    console.log('Removing shorts navigation buttons...');
    // find all endpoint elements
    const btnElements = document.querySelectorAll('[id=endpoint]');
    btnElements.forEach((element) => {
      // check if it's an anchor element with the href containing 'shorts'
      if (element === null || element === undefined) {
        return;
      }

      if (element) {
        const tagsToCheck = [
          element.innerText,
          element.title,
          element.href,
          element.ariaLabel,
        ];

        tagsToCheck.forEach((tag) => {
          if (!tag || tag === undefined || tag === null) {
            return;
          }

          if (tag.toLowerCase().includes('shorts')) {
            console.log('Element:', element);
            console.log('Shorts navigation button detected! Removing...');
            console.log('Shorts button detected! Removing...');
            element.remove();
          }
        });
      }
    });
  };

  const removeShortsOnFeed = () => {
    const pageElements = document.querySelectorAll('[id=dismissible]');

    pageElements.forEach((element) => {
      element.remove();
    });
  };

  const handleYTShortsCheck = () => {
    const currentURL = window.location.href;

    if (currentURL.toLowerCase().includes('shorts')) {
      console.log('Shorts page detected!');

      // force redirect to youtube.com
      setTimeout(() => {
        window.open('https://www.youtube.com/', '_self').focus();
      }, 2000);

      return true;
    } else {
      return false;
    }
  };

  console.log('Waiting for elements to load...');

  // check if user is on shorts page every 5 seconds -- works but a bit inefficient
  // setInterval(() => {
  //   if (handleYTShortsCheck()) {
  //     console.log('Shorts page detected!');
  //   } else {
  //     console.log('Not on shorts page.');
  //   }
  // }, 5000);

  // Listening for YouTube's internal navigation event
  window.addEventListener('yt-navigate-finish', onUrlChange);

  // observe changes to dynamically remove shorts navigation buttons
  const observer = new MutationObserver(removeShortsNavigationBtns);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // remove shorts on load
  setTimeout(() => {
    handleYTShortsCheck();
    removeShortsOnFeed();
  }, 1000);

  // just incase the page is not loaded yet
  setTimeout(() => {
    handleYTShortsCheck();
    removeShortsOnFeed();
  }, 5000);
};

const handleDefault = () => {
  console.log('Handling default...');
};

// ================== MAIN ==================

// main entry point (weird but im just used to this)
const main = () => {
  if (currentURL.toLowerCase().includes('youtube')) {
    handleYoutube();
  }
};

main();
