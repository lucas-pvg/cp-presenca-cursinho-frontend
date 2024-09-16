import CPLogo from '../../assets/cp-logo.png';
import CPIcon from '../../assets/cp-icon.png';
import './IconCP.css';

interface IconProps {
  type?: 'icon' | 'logo';
}

export function IconCP({ type }: IconProps) {
  return (
    <div className="cp-icon">
      {type == 'logo' ? (
        <img className="logo" src={CPLogo} alt="Logo CP" />
      ) : (
        <img className="icon" src={CPIcon} alt="Icon CP" />
      )}
    </div>
  );
}
