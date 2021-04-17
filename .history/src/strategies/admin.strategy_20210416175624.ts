import {AuthenticationStrategy} from '@loopback/authentication';

export class AdminStrategy implements AuthenticationStrategy{
  name: String = 'admin';

}

