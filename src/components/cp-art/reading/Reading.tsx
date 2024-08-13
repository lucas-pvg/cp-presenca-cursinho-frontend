import ReadingImg from '../../../assets/cp-images/reading.png';
import Circle from '../../../assets/cp-doodles/circle.png';
import X from '../../../assets/cp-doodles/x.png';
import Spiral from '../../../assets/cp-doodles/spiral.png';
import Baloon from '../../../assets/cp-doodles/baloon.png';
import Wave from '../../../assets/cp-doodles/wave.png';
import Hash from '../../../assets/cp-doodles/hash.png';
import './Reading.css';

interface ReadingProps {
  className?: string;
}

export function Reading({ className }: ReadingProps) {
  const classes = `${className ? className : 'reading'}`;

  return (
    <div className={classes}>
      <img className="reading-img" src={ReadingImg} alt="Image" />
      <img className="float doodle d1" src={Circle} alt="Image" />
      <img className="float doodle d2" src={X} alt="Image" />
      <img className="float doodle d3" src={Spiral} alt="Image" />
      <img className="float doodle d4" src={Baloon} alt="Image" />
      <img className="float doodle d5" src={Wave} alt="Image" />
      <img className="float doodle d6" src={Hash} alt="Image" />
    </div>
  );
}
