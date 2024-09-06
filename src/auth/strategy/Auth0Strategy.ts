import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-auth0';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'auth0') {
  constructor(private readonly configService: ConfigService) {
    super({
      domain: configService.get<string>('AUTH0_DOMAIN'),
      clientID: configService.get<string>('AUTH0_CLIENT_ID'),
      clientSecret: configService.get<string>('AUTH0_CLIENT_SECRET'),
      callbackURL: configService.get<string>('AUTH0_CALLBACK_URL'),
      scope: 'openid profile email',
      state: false,
    });
  }

  async validate(accessToken: string, refreshToken: string, extraParams: any, profile: any) {
    // Si el email no está disponible, genera uno temporal basado en el ID o nombre del usuario
    const email = profile.emails && profile.emails[0] ? profile.emails[0].value : `temp-${profile.id}@noemail.com`;

    // Puedes lanzar una advertencia o simplemente manejarlo de forma silenciosa
    if (!profile.emails) {
      console.warn('Email not available from Auth0 profile, using temporary email');
    }

    return {
      email: email,
      name: profile.displayName,
      picture: profile.picture,
      id: profile.id,
    };
  }
}
