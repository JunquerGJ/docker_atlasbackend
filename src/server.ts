import 'reflect-metadata';
import 'dotenv/config';
import AuthenticationController from './routes/authentication/authentication.controller';
import UserController from './routes/users/user.controller';
import ProfileController from './routes/profiles/profile.controller';
import App from './app';
import AreaController from './routes/areas/area.controller';
import AssetController from './routes/assets/asset.controller'
import AuditController from './routes/audits/audit.controller';
import ContactController from './routes/contacts/contact.controller';
import VulnerabilityController from './routes/vulnerabilities/vulnerability.controller';
import CWEController from './routes/cwes/cwe.controller';
import NetworkController from './routes/networks/network.controller';
import IPController from './routes/ips/ip.controller';
import ServerController from './routes/servers/server.controller';
import CharacteristicController from './routes/characteristics/characteristic.controller';
import CertificateController from './routes/certificates/certificate.controller';
import DomainController from './routes/domains/domain.controller';




(async () => {
  const app = new App(
    [
      new AuthenticationController(),
      new UserController(),
      new ProfileController(),
      new AreaController(),
      new AssetController(),
      new AuditController(),
      new ContactController(),
      new VulnerabilityController(),
      new CWEController(),
      new NetworkController(),
      new IPController(),
      new AssetController(),
      new ServerController(),
      new CharacteristicController(),
      new CertificateController(),
      new DomainController()
    ]
  );

  app.listen()
})();

