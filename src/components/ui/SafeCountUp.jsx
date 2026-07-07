import React from 'react';
import CountUpModule from 'react-countup';

// Ensure we get the actual component function whether it's the module object or the function itself
const CountUp = CountUpModule.default || CountUpModule;

export function SafeCountUp(props) {
  return <CountUp {...props} />;
}
