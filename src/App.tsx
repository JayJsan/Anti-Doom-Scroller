/*global chrome*/
import './App.css';
import SettingsSwitch from './components/SettingsSwitch/SettingsSwitch';

function App() {
  const handleToggle = (value: boolean) => {
    console.log(value);
    sendMessageToContentScript('toggle_shorts_feed_removal', value);
  };
  return (
    <>
      <h1>Settings</h1>
      <div>
        <SettingsSwitch
          label={'Enable Shorts Feed Removal'}
          onToggle={handleToggle}
        />
      </div>
    </>
  );
}

declare const chrome: any;

const sendMessageToContentScript = (actionName: string, payload: boolean) => {
  chrome.runtime.sendMessage({
    action: actionName,
    value: payload,
  });
};

export default App;
