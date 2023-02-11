const InputFile = () => {
  return (
    <div>
      <input style={{ display: 'none' }} type="file" id="file" />
      <label htmlFor="file">
        <svg
          width="96"
          height="96"
          viewBox="0 0 96 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="96" height="96" rx="48" fill="#F2F3F5" />
          <g clipPath="url(#clip0_722_1264)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M41.2246 36.6224L42.0906 35.6481L42.0906 35.6481C42.7935 34.8573 43.1449 34.4619 43.5678 34.1783C43.9426 33.9268 44.3572 33.7407 44.7941 33.6276C45.287 33.5 45.816 33.5 46.874 33.5H49.126C50.184 33.5 50.713 33.5 51.2059 33.6276C51.6428 33.7407 52.0574 33.9268 52.4322 34.1783C52.8551 34.4619 53.2065 34.8573 53.9094 35.6481L53.9094 35.6481L54.7754 36.6224C54.806 36.6568 54.8213 36.6739 54.8361 36.6903C55.5839 37.5131 56.6404 37.9875 57.7521 37.9998C57.7742 38 57.7972 38 57.8432 38C57.9888 38 58.0616 38 58.1231 38.0013C61.3404 38.0673 63.9327 40.6596 63.9987 43.8769C64 43.9384 64 44.0112 64 44.1568V52.4C64 55.7603 64 57.4405 63.346 58.7239C62.7708 59.8529 61.8529 60.7708 60.7239 61.346C59.4405 62 57.7603 62 54.4 62H41.6C38.2397 62 36.5595 62 35.2761 61.346C34.1471 60.7708 33.2292 59.8529 32.654 58.7239C32 57.4405 32 55.7603 32 52.4V44.1568C32 44.0112 32 43.9384 32.0013 43.8769C32.0673 40.6596 34.6596 38.0673 37.8769 38.0013C37.9384 38 38.0112 38 38.1568 38C38.2028 38 38.2258 38 38.2479 37.9998C39.3596 37.9875 40.4161 37.5131 41.1639 36.6903C41.1787 36.674 41.1939 36.6569 41.2242 36.6228L41.2242 36.6227L41.2246 36.6224ZM43 49C43 46.2386 45.2386 44 48 44C50.7614 44 53 46.2386 53 49C53 51.7614 50.7614 54 48 54C45.2386 54 43 51.7614 43 49ZM48 42C44.134 42 41 45.134 41 49C41 52.866 44.134 56 48 56C51.866 56 55 52.866 55 49C55 45.134 51.866 42 48 42Z"
              fill="#C8C9CC"
            />
          </g>
          <defs>
            <clipPath id="clip0_722_1264">
              <rect
                width="36"
                height="36"
                fill="white"
                transform="translate(30 30)"
              />
            </clipPath>
          </defs>
        </svg>
      </label>
    </div>
  );
};

export default InputFile;
