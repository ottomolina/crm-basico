import { CSSProperties } from 'react';

const divDashboard: CSSProperties = {
  // backgroundImage: `url(${Background})`,
  width: '100%',
  height: '100%',
  backgroundRepeat: 'no-repeat',
  position: 'absolute'
};

export const Dashboard = () => {
  return <div style={divDashboard}></div>;
};
