import React, { useState, lazy } from 'react';
import Component1 from './components/Component1';
import unUsedComponent from './components/UnUsedComponent';

const Component2 = lazy(() => import('./components/Component2'));

const App = () => {
  const [showComponent2, setShowComponent2] = useState(false);

  const handleClick = () => {
    setShowComponent2(true);
  }

  return (
    <div>
      <Component1 />
      <button onClick={handleClick}>Load Component 2</button>
      {showComponent2 && <React.Suspense fallback={<div>Loading...</div>}>
        <Component2 />
      </React.Suspense>}
    </div>
  );
}

export default App;
