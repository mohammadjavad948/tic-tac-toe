import * as React from 'react';
import Svg, {Defs, ClipPath, Path, G} from 'react-native-svg';
import {Appearance} from 'react-native';
import {a, useSpring, config} from 'react-spring/native';

const Apath = a(Path);
// @ts-ignore
function Logo(props) {
  const theme = Appearance.getColorScheme();

  const animation = useSpring({
    from: {
      strokeDashoffset: 800,
    },
    to: {
      strokeDashoffset: 0,
    },
    loop: {reverse: true},
    config: config.slow,
  });
  return (
    <Svg
      width={200}
      height={200}
      viewBox="0 0 560.28 560.28"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Defs>
        <ClipPath id="prefix__a">
          <Path d="M0 1080h1920V0H0z" />
        </ClipPath>
      </Defs>
      <G
        clipPath="url(#prefix__a)"
        transform="matrix(1.3333 0 0 -1.3333 -871.69 1166.401)">
        <Path
          d="M986.24 761.21l-.997.995.997-.995M985.24 567.2l.997.995-.997-.995"
          fill="#fefefe"
        />
        <Apath
          d="M835.07 728.12c7.125 8.27 16.569 12.993 26.516 16.648 48.51 17.824 101.14-13.573 108.57-64.634 6.962-47.818-30.503-91.535-78.895-92.212-20.987-.294-39.377 6.304-55.258 19.953-.605.521-1.028 1.252-1.534 1.885 1.439-.288 2.878-.566 4.313-.863 10.179-2.109 20.139 3.605 22.334 13.696.898 4.128-.312 8.712-.563 13.089.578-.274 1.221-.461 1.722-.836 12.881-9.622 26.973-12.26 42.204-6.83 20.957 7.471 32.813 29.826 27.361 51.098-5.672 22.14-26.508 35.837-48.924 32.556-8.516-1.247-15.514-5.338-22.398-9.957l.844 3.324c2.927 11.52-3.904 22.349-15.614 24.011-3.447.489-7.115-.575-10.681-.928"
          stroke={theme === 'dark' ? 'white' : 'black'}
          strokeWidth={2}
          strokeDasharray={400}
          strokeDashoffset={animation.strokeDashoffset}
        />
        <Apath
          d="M860.55 635.69c.251-4.377 1.461-8.961.563-13.089-2.196-10.091-12.156-15.805-22.334-13.696-1.435.297-2.874.575-4.313.863-9.596 9.259-19.184 18.525-28.79 27.772-1.526 1.468-3.133 2.853-4.702 4.276l-26.722 26.386c.011.324.016.649.015.975l26.752 26.418c8.841 8.688 17.668 17.39 26.533 26.054 2.008 1.962 4.146 3.79 6.225 5.68l1.218.803.069-.004c3.566.353 7.234 1.416 10.681.928 11.71-1.662 18.541-12.491 15.614-24.012l-.844-3.322-.009-.022-.829-1.076-33.815-31.776 33.806-32.015.898-1.122z"
          stroke={theme === 'dark' ? 'white' : 'black'}
          strokeWidth={2}
          strokeDasharray={400}
          strokeDashoffset={animation.strokeDashoffset}
        />
        <Apath
          d="M801.02 695.59l-26.751-26.418c-9.413 9.294-19.134 18.304-28.144 27.975-7.861 8.439-5.358 22.785 4.78 28.168 7.106 3.773 15.984 4.111 22.71-2.41 9.26-8.977 18.281-18.198 27.405-27.315M774.25 668.2l26.722-26.386c-8.758-8.776-17.437-17.632-26.297-26.304-7.9-7.733-19.757-7.82-27.191-.432-7.658 7.61-7.463 19.337.617 27.408 8.648 8.639 17.427 17.149 26.149 25.714"
          stroke={theme === 'dark' ? 'white' : 'black'}
          strokeWidth={2}
          strokeDasharray={400}
          strokeDashoffset={animation.strokeDashoffset}
        />
        <Path
          d="M835 728.13l-1.218-.804 1.218.804M860.51 701.7l-.829-1.076.829 1.076M859.67 636.83l.898-1.122-.898 1.122"
          fill="#6abf8f"
        />
      </G>
    </Svg>
  );
}

export default Logo;
