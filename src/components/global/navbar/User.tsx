import IconImgButton from '@/components/common/icon_button/IconButton';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Logout from '@mui/icons-material/Logout';
import Login from '@mui/icons-material/Login';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface User {
        email: string;
        email_verified: boolean;
        exp: number;
        name: string;
        picture: string;
        sub: string;
        expires_at: number;
    }

    interface Session extends DefaultSession {
        user?: User;
    }
}

function User() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const router = useRouter();

    // const {id_token, idToken} = sessions?.user as { id_token?: string, idToken?: string } || {};
    const handleClose = (url?: string) => {
        setAnchorEl(null);
        url && router.push(url);
    };

    const { data: session } = useSession();

    useEffect(() => {
        console.log('next auth session', session);
    }, [session]);

    const isExpired = (expirationTime: number) => {
        console.log('expirationTime', expirationTime);
        console.log('Date.now()', Date.now());
        console.log('return value', expirationTime < Date.now() / 1000);
        return expirationTime < Date.now() / 1000;
    };

    // const dropdown = [
    //     ["My Profile", "/my-profile", "/images/icon-container (2).svg"],
    //     ["API Plans", "/apiplans", "/images/API.svg"],
    //     ["API Keys", "/apiKeys", "images/shield-key.svg"],
    // ]
    const propsConfig = {
        elevation: 0,
        sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1,
            width: 190,
            '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.7,
                mr: 1,
            },
            '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
            },
        },
    };
    return (
        <div className="flex items-center gap-1">
            {((session?.user?.expires_at && !isExpired(session.user.expires_at)) ||
                (session?.user?.exp && !isExpired(session?.user?.exp))) &&
            session.user?.image ? (
                <>
                    {/* <IconImgButton icon="/images/icon-container (1).svg" /> */}
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            style={{ height: '40px', width: '40px' }}
                            aria-controls={open ? 'user-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <img
                                src={session.user?.image ? session.user.image : '/images/icon-container (2).svg'}
                                style={{ borderRadius: '50%' }}
                                alt="user"
                            />
                        </IconButton>
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        id="user-menu"
                        open={open}
                        onClose={() => handleClose()}
                        onClick={() => handleClose()}
                        PaperProps={propsConfig}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        {/* {dropdown?.map((menuItem, index) => (
                        <MenuItem key={index} className="ml-0" onClick={() => handleClose(menuItem[1])}>
                            <ListItemIcon>
                                <img src={menuItem[2]} alt=""/>
                            </ListItemIcon>
                            <span className="mr-3.5"> {menuItem[0]}</span>
                        </MenuItem>
                    ))
                    }
                    <Divider/> */}
                        <MenuItem>
                            <Button
                                fullWidth
                                color="inherit"
                                variant="outlined"
                                onClick={() => signOut()}
                                startIcon={<Logout fontSize="inherit" />}
                            >
                                Sign Out
                            </Button>
                        </MenuItem>
                    </Menu>
                </>
            ) : (
                <>
                    <Button
                        fullWidth
                        color="inherit"
                        variant="outlined"
                        style={{ marginRight: '10px' }}
                        onClick={() => signIn('twitter')}
                        // onClick={() => router.push(`/login?callBack=${router?.asPath ? router?.asPath : '/'}`)}
                        startIcon={<img style={{ height: '20px', width: '20px' }} src="/images/twitter.svg" alt="" />}
                    >
                        Twitter
                    </Button>
                    <Button
                        fullWidth
                        color="inherit"
                        style={{ marginRight: '10px' }}
                        variant="outlined"
                        onClick={() => signIn('github')}
                        // onClick={() => router.push(`/login?callBack=${router?.asPath ? router?.asPath : '/'}`)}
                        startIcon={<img style={{ height: '20px', width: '20px' }} src="/images/github.svg" alt="" />}
                    >
                        GITHUB
                    </Button>
                </>
            )}
        </div>
    );
}

export default User;
