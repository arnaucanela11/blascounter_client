import Image from "next/image"
import Link from "next/link"
import Logo from "../../assets/Title.png";
import Twitter from '../../assets/Twitter.svg'
import TikTok from '../../assets/TikTok.svg'
import './Footer.css'

const Footer = () => {
  return (
    <div style={{
        display: 'flex',
        flexDirection: 'row', 
        alignItems: 'center',
        marginTop: '10px',
        paddingBottom: '50px',
        gap: '100px',
    }} className="footer__div">
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
        marginLeft: '180px'
    }}>
        <Link href="/" style={{
            marginBottom: '-10px'
        }}>
          <Image src={Logo} width="280" alt="logo"/>
        </Link>
        <p style={{
            paddingLeft: '55px',
            lineHeight: '28px'
        }}>
        Blascounter is a tiktok accounts marketplace which aim to help all the people<br /> that want to grow on tiktok 
faster. Also, allow all the people that have a tiktok account <br />with quite followers and they do not want it to earn
money through selling their account. 
        </p>
        <h4 style={{
            paddingLeft: '55px',
            marginTop: '0px'
        }}>Contact: blascounter@gmail.com</h4>
        </div>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <h1 className="links__h1">Links</h1>
            <ul style={{
                listStyle: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '18px',
                marginTop: '4px'
            }}>
                <Link href='/sell-account' className="Link">Sell Account</Link>
                <Link href='/set-up' className="Link">Set Up</Link>
                <Link href='/login' className="Link">Login</Link>
                <Link href='/info' className="Link">Things you have to know</Link>
            </ul>
        </div>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <h1 className="links__h1">Social</h1>
            <ul style={{
                listStyle: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '18px',
                marginTop: '4px'
            }}>
                <Link href='https://twitter.com/@MarciArni' className="Link"><Image src={Twitter}/></Link>
                <Link href='https://tiktok.com/@MarciArni' className="Link"><Image src={TikTok}/></Link>
            </ul>
        </div>
        <span style={{
            position: 'absolute',
            bottom: '5px',
            left: '42%',
            color: 'rgba(0, 0, 0, 0.70)',
            fontSize: '15px'
        }}>2023 Blascounter, all rights reserved</span>
    </div>
  )
}

export default Footer