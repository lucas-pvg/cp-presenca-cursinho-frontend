import ZombieImg from "../../../assets/cp-images/zombie.png"
import Circle from "../../../assets/cp-doodles/circle.png"
import X from "../../../assets/cp-doodles/x.png"
import Spiral from "../../../assets/cp-doodles/spiral.png"
import Baloon from "../../../assets/cp-doodles/baloon.png"
import Wave from "../../../assets/cp-doodles/wave.png"
import Hash from "../../../assets/cp-doodles/hash.png"
import './Zombie.css'

interface ZombieProps {
  className?: string
}

export function Zombie({ className }: ZombieProps) {
  const classes = `${className ? className : 'zombie'}`
  
  return (
    <div className={classes}>
      <img className="zombie-img" src={ZombieImg} alt="Image" />
      <img className="float doodle d1" src={Circle} alt="Image" />
      <img className="float doodle d2" src={Circle} alt="Image" />
      <img className="float doodle d3" src={X} alt="Image" />
      <img className="float doodle d4" src={X} alt="Image" />
      <img className="float doodle d5" src={Spiral} alt="Image" />
      <img className="float doodle d6" src={Spiral} alt="Image" />
      <img className="float doodle d7" src={Baloon} alt="Image" />
      <img className="float doodle d8" src={Baloon} alt="Image" />
      <img className="float doodle d9" src={Wave} alt="Image" />
      <img className="float doodle d10" src={Wave} alt="Image" />
      <img className="float doodle d11" src={Hash} alt="Image" />
      <img className="float doodle d12" src={Hash} alt="Image" />
    </div>
  )
}
