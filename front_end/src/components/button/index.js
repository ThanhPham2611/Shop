import { Button } from "antd"

import styles from './button.module.scss';

export const ButtonSecond = ({ title, icon, className, style }) => {
  return (
    <Button icon={icon} className={['buttonSecond', className]}>
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