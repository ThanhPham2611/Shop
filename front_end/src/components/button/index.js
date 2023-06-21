import { Button } from "antd"

import styles from './button.module.scss';

export const ButtonSecond = ({ title, icon, className, style, onClick }) => {
  return (
    <Button icon={icon} className={['buttonSecond', className]} onClick={() => onClick()}>
      {title}
    </Button>
  )
}

export const ButtonFirst = ({ title, className }) => {
  return (
    <Button className={['buttonFirst', className]}>
      {title}
    </Button>
  )
}