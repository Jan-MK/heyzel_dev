import styles from './Skeleton.module.scss'

const Skeleton = ({ classes }) => {
    const classNames = `${styles.skeleton} ${classes} ${styles.animatePulse}`

    return <div className={classNames}></div>
}
export default Skeleton