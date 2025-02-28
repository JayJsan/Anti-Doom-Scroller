import { Switch } from 'radix-ui';
import './SettingsSwitch.css';
import '../../styles/Switch.css';

interface SettingsSwitchProps {
  label: string;
  onToggle: (value: boolean) => void;
}

const SettingsSwitch = ({ label, onToggle }: SettingsSwitchProps) => {
  return (
    <div>
      <p>{label}</p>
      <Switch.Root
        className="SwitchRoot"
        id="airplane-mode"
        onCheckedChange={(bool) => {
          onToggle(bool);
        }}
        defaultChecked={true}
      >
        <Switch.Thumb className="SwitchThumb" />
      </Switch.Root>
    </div>
  );
};

export default SettingsSwitch;
