import Link from 'next/link';
import styles from './styles.module.scss'
import { SignInButton } from '../SignInButton'

export function Header(){
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/"> 
                    <img src="/images/logo2.svg" alt="" />
                </Link>
                <nav>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                    <Link href="/board">
                        <a>MyBoard</a>
                    </Link>
                </nav>

                <SignInButton/>

            </div>
        </header>
    )
}