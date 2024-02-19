// App.js

import React, { useState } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import store from './redux/store';
import TaskList from './TaskList';

const App = () => {

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <TaskList />
      </View>
    </Provider>
  );
};

export default App;
