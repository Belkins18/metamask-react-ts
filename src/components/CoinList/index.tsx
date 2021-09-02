import { useEffect, useState } from "react";
import useWeb3 from "../../hooks/useWeb3";
import useWeb3Contract from "../../hooks/useWeb3Contract";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  List,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Container
} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import pngOwnix from "../../assets/images/ownix.png";
import svgEthereum from "../../assets/images/ethereum.svg";

declare global {
  interface Window {
    ethereum: any;
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      alignItems: "center",
      width: "100%",
      paddingTop: theme.spacing(4)
    },
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      "& > *": {
        width: "auto",
      },
    },
  })
);

export default function SimpleList() {
  const classes = useStyles();
  const ethereum = window.ethereum;
  const web3 = useWeb3();
  const contract = useWeb3Contract(web3!);

  const [address, setAddress] = useState<string>("");
  const [balanceETH, setBalanceETH] = useState<number>(0);
  const [balanceONX, setBalanceONX] = useState<number>(0);

  const ethereumAccountsChange = (accounts: Array<string>) => {
    setAddress(accounts[0]);
    // setStatus(!address ? false : true);
    if (accounts[0]) {
      toast.info(`${accounts[0]} Account changed! `, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const getBalanceETH = async () => {
    try {
      const value = await web3?.eth.getBalance(address);
      const format = value && web3?.utils.fromWei(value);
      setBalanceETH(Number(format));
    } catch (error) {
      toast.error(`${error}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  async function getBalanceONX() {
    console.log(contract);
    try {
      // @ts-ignore
      const result = await contract?.methods.balanceOf(address).call();
      const format = web3?.utils.fromWei(result);
      setBalanceONX(Number(format));
    } catch (error) {
      toast.error(`${error}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  const getAccounts = async () => {
    try {
      const accounts = await web3?.eth.getAccounts();

      return accounts;
    } catch (error) {
      toast.error(`${error}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
      console.log(web3);
    async function init() {
      try {
        await getAccounts();

        ethereum.on("accountsChanged", (accounts: Array<string>): void =>
          ethereumAccountsChange(accounts)
        );
      } catch (error) {
        
        toast.error(`${error}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }

    web3 && init();
    return () => {
        if (web3) {
          ethereum.off("accountsChanged", (accounts: Array<string>) =>
            ethereumAccountsChange(accounts)
          );
        }
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3]);

  useEffect(() => {
    address && getBalanceETH();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    address && getBalanceONX();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, address]);

  return (
    <Container maxWidth="sm" className={classes.root}>
      {address ? (
        <>
          <Typography variant="body1" component="h2">
            Connected to wallet: <b>{address}</b>
          </Typography>

          <Divider />
          <List component="nav" aria-label="main mailbox folders">
            <ListItem>
              <ListItemIcon>
                <Avatar
                  alt="metamask"
                  src={svgEthereum}
                  className={classes.small}
                />
              </ListItemIcon>
              <ListItemText primary={`${balanceETH} ETH`} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Avatar
                  alt="metamask"
                  src={pngOwnix}
                  className={classes.small}
                />
              </ListItemIcon>
              <ListItemText primary={`${balanceONX} ONX`} />
            </ListItem>
          </List>
        </>
      ) : (
        <Typography variant="h6" component="h2">
          Reconnect you metamask!
        </Typography>
      )}
    </Container>
  );
}
