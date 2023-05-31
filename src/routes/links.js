import { Router } from 'express'
import shell from 'shelljs'
const routes = Router();

// SHOW ALL STATUS SERVICES
routes.get('/', (req, res) => {
    const firewall = shell.exec("sudo service ufw status  | sed -n '3p' | awk '{print $2}'");
    const dhcp = shell.exec("sudo service isc-dhcp-server status  | sed -n '3p' | awk '{print $2}'");
    const dns = shell.exec("sudo service bind9 status | sed -n '3p' | awk '{print $2}'");
    const ldap = shell.exec("sudo service slapd status | sed -n '5p' | awk '{print $2}'");
    const ftp = shell.exec("sudo service vsftpd status | sed -n '3p' | awk '{print $2}'");
    const apache = shell.exec("sudo service apache2 status | sed -n '3p' | awk '{print $2}'");
    const ProxyWeb = shell.exec("sudo service squid status | sed -n '3p' | awk '{print $2}'");
    const Mail = shell.exec("sudo service postfix status | sed -n '3p' | awk '{print $2}'");
    const Samba = shell.exec("sudo service smbd status | sed -n '3p' | awk '{print $2}'");
    const Antivirus = shell.exec("sudo service clamav-freshclam status | sed -n '3p' | awk '{print $2}'");
    const VPN = shell.exec("sudo service openvpn status | sed -n '3p' | awk '{print $2}'");

    const data = [
        { name: "firewall", status: firewall, type: "ufw", command: "" },
        { name: "dhcp", status: dhcp, type: "isc-dhcp-server" },
        { name: "dns", status: dns, type: "bind9" },
        { name: "ldap", status: ldap, type: "slapd" },
        { name: "ftp", status: ftp, type: "vsftpd" },
        { name: "apache", status: apache, type: "apache2" },
        { name: "ProxyWeb", status: ProxyWeb, type: "squid" },
        { name: "Mail", status: Mail, type: "postfix" },
        { name: "Samba", status: Samba, type: "smbd" },
        { name: "Antivirus", status: Antivirus, type: "clamav-freshclam" },
        { name: "VPN", status: VPN, type: "openvpn" }
    ]

    res.render('main', { data });
});

// DISABLE SERVICE
routes.post('/disable', (req, res) => {
    const { command } = req.body;
    shell.exec(command);
    res.redirect('/');
});

// ENABLE SERVICE
routes.post('/enable', (req, res) => {
    const { command } = req.body;
    shell.exec(command);
    res.redirect('/');
});


export default routes;