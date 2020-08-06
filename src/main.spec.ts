
import { SocialLinks, TYPE_DESKTOP, TYPE_MOBILE, Profile } from './main';

describe('SocialLinks', () => {
  let sl: SocialLinks;

  beforeEach(() => {
    sl = new SocialLinks();
  });

  describe('constants', () => {
    it('should be defined TYPE_DESKTOP', () => {
      expect(TYPE_DESKTOP).toBeDefined();
    });

    it('should be defined TYPE_MOBILE', () => {
      expect(TYPE_MOBILE).toBeDefined();
    });

    it('should be distnict', () => {
      expect(TYPE_MOBILE).not.toEqual(TYPE_DESKTOP);
    });
  });

  describe('isValid', () => {
    it('should be valid http', () => {
      expect(sl.isValid('linkedin', 'http://www.linkedin.com/in/gkucmierz')).toBe(true);
    });

    it('should be valid https', () => {
      expect(sl.isValid('linkedin', 'https://www.linkedin.com/in/gkucmierz')).toBe(true);
    });

    it('should be valid http, no-www', () => {
      expect(sl.isValid('linkedin', 'http://linkedin.com/in/gkucmierz')).toBe(true);
    });

    it('should be valid https, no-www', () => {
      expect(sl.isValid('linkedin', 'https://linkedin.com/in/gkucmierz')).toBe(true);
    });

    it('should be valid no-protocol', () => {
      expect(sl.isValid('linkedin', 'www.linkedin.com/in/gkucmierz')).toBe(true);
    });

    it('should be valid no-protocol, no-www', () => {
      expect(sl.isValid('linkedin', 'linkedin.com/in/gkucmierz')).toBe(true);
    });

    it('should be valid only id', () => {
      expect(sl.isValid('linkedin', 'gkucmierz')).toBe(true);
    });
  });

  describe('getProfileId', () => {
    it('should work with http', () => {
      expect(sl.getProfileId('linkedin', 'http://www.linkedin.com/in/gkucmierz')).toBe('gkucmierz');
    });

    it('should work with https', () => {
      expect(sl.getProfileId('linkedin', 'https://www.linkedin.com/in/gkucmierz')).toBe('gkucmierz');
    });

    it('should work with http, no-www', () => {
      expect(sl.getProfileId('linkedin', 'http://linkedin.com/in/gkucmierz')).toBe('gkucmierz');
    });

    it('should work with https, no-www', () => {
      expect(sl.getProfileId('linkedin', 'https://linkedin.com/in/gkucmierz')).toBe('gkucmierz');
    });

    it('should work with no-protocol', () => {
      expect(sl.getProfileId('linkedin', 'www.linkedin.com/in/gkucmierz')).toBe('gkucmierz');
    });

    it('should work with only id', () => {
      expect(sl.getProfileId('linkedin', 'gkucmierz')).toBe('gkucmierz');
    });
  });

  describe('getLink', () => {
    it('should create default TYPE_DESKTOP link', () => {
      expect(sl.getLink('linkedin', 'gkucmierz')).toBe('https://linkedin.com/in/gkucmierz');
    });

    it('should create TYPE_DESKTOP link', () => {
      expect(sl.getLink('linkedin', 'gkucmierz', TYPE_DESKTOP)).toBe('https://linkedin.com/in/gkucmierz');
    });

    it('should create TYPE_MOBILE link', () => {
      expect(sl.getLink('linkedin', 'gkucmierz', TYPE_MOBILE)).toBe('https://linkedin.com/mwlite/in/gkucmierz');
    });
  });

  describe('sanitize', () => {
    it('should sanitize link https, www', () => {
      const sanitized = sl.sanitize('linkedin', 'https://www.linkedin.com/in/gkucmierz');
      expect(sanitized).toBe('https://linkedin.com/in/gkucmierz');
    });

    it('should sanitize link https', () => {
      const sanitized = sl.sanitize('linkedin', 'https://linkedin.com/in/gkucmierz');
      expect(sanitized).toBe('https://linkedin.com/in/gkucmierz');
    });

    it('should sanitize link http', () => {
      const sanitized = sl.sanitize('linkedin', 'http://linkedin.com/in/gkucmierz');
      expect(sanitized).toBe('https://linkedin.com/in/gkucmierz');
    });

    it('should sanitize link www', () => {
      const sanitized = sl.sanitize('linkedin', 'www.linkedin.com/in/gkucmierz');
      expect(sanitized).toBe('https://linkedin.com/in/gkucmierz');
    });

    it('should sanitize link', () => {
      const sanitized = sl.sanitize('linkedin', 'linkedin.com/in/gkucmierz');
      expect(sanitized).toBe('https://linkedin.com/in/gkucmierz');
    });

    it('should sanitize link as mobile', () => {
      const sanitized = sl.sanitize('linkedin', 'linkedin.com/in/gkucmierz', TYPE_MOBILE);
      expect(sanitized).toBe('https://linkedin.com/mwlite/in/gkucmierz');
    });

    it('should sanitize mobile link as mobile', () => {
      const sanitized = sl.sanitize('linkedin', 'linkedin.com/mwlite/in/gkucmierz');
      expect(sanitized).toBe('https://linkedin.com/mwlite/in/gkucmierz');
    });

    it('should sanitize mobile link as desktop', () => {
      const sanitized = sl.sanitize('linkedin', 'linkedin.com/mwlite/in/gkucmierz', TYPE_DESKTOP);
      expect(sanitized).toBe('https://linkedin.com/in/gkucmierz');
    });

    it('should sanitize link with slash at end', () => {
      const sanitized = sl.sanitize('linkedin', 'linkedin.com/in/gkucmierz/');
      expect(sanitized).toBe('https://linkedin.com/in/gkucmierz');
    });

    it('should sanitize only profile id', () => {
      const sanitized = sl.sanitize('linkedin', 'gkucmierz');
      expect(sanitized).toBe('https://linkedin.com/in/gkucmierz');
    });

    it('should sanitize only profile id as mobile', () => {
      const sanitized = sl.sanitize('linkedin', 'gkucmierz', TYPE_MOBILE);
      expect(sanitized).toBe('https://linkedin.com/mwlite/in/gkucmierz');
    });
  });

  describe('PREDEFINED_PROFILES', () => {

    const testProfile = (profile: string, profileId: string, desktop: string, mobile: string) => {
      expect(sl.hasProfile(profile)).toBeTruthy();

      expect(sl.isValid(profile, desktop)).toBeTruthy();
      expect(sl.isValid(profile, mobile)).toBeTruthy();

      expect(sl.getProfileId(profile, desktop)).toBe(profileId);
      expect(sl.getProfileId(profile, mobile)).toBe(profileId);

      expect(sl.getLink(profile, profileId)).toBe(desktop);
      expect(sl.getLink(profile, profileId, TYPE_DESKTOP)).toBe(desktop);
      expect(sl.getLink(profile, profileId, TYPE_MOBILE)).toBe(mobile);

      expect(sl.sanitize(profile, desktop)).toBe(desktop);
      expect(sl.sanitize(profile, desktop, TYPE_DESKTOP)).toBe(desktop);
      expect(sl.sanitize(profile, mobile, TYPE_MOBILE)).toBe(mobile);
    };

    const testProfileDesktop = (profile: string, profileId: string, desktop: string) => {
      expect(sl.hasProfile(profile)).toBeTruthy();

      expect(sl.isValid(profile, desktop)).toBeTruthy();

      expect(sl.getProfileId(profile, desktop)).toBe(profileId);

      expect(sl.getLink(profile, profileId)).toBe(desktop);
      expect(sl.getLink(profile, profileId, TYPE_DESKTOP)).toBe(desktop);

      expect(sl.sanitize(profile, desktop)).toBe(desktop);
      expect(sl.sanitize(profile, desktop, TYPE_DESKTOP)).toBe(desktop);
    };

    it('should linkedin', () => {
      const profile = 'linkedin';
      const profileId = 'gkucmierz';
      const desktop = `https://linkedin.com/in/${profileId}`;
      const mobile = `https://linkedin.com/mwlite/in/${profileId}`;
      testProfile(profile, profileId, desktop, mobile);
    });

    it('should twitter', () => {
      const profile = 'twitter';
      const profileId = 'webtools_app';
      const desktop = `https://twitter.com/${profileId}`;
      const mobile = `https://mobile.twitter.com/${profileId}`;
      testProfile(profile, profileId, desktop, mobile);
    });

    it('should facebook', () => {
      const profile = 'facebook';
      const profileId = 'gkucmierz';
      const desktop = `https://facebook.com/${profileId}`;
      const mobile = `https://m.facebook.com/${profileId}`;
      testProfile(profile, profileId, desktop, mobile);
    });

    it('should youtube', () => {
      const profile = 'youtube';
      const profileId = 'UCpHGx5iSfXZ-7AicGd6IZtg';
      const desktop = `https://youtube.com/channel/${profileId}`;
      const mobile = `https://m.youtube.com/c/${profileId}`;
      testProfile(profile, profileId, desktop, mobile);
    });

    it('should twitch', () => {
      const profile = 'twitch';
      const profileId = 'gkucmierz';
      const desktop = `https://twitch.tv/${profileId}`;
      const mobile = `https://m.twitch.tv/${profileId}`;
      testProfile(profile, profileId, desktop, mobile);
    });

    it('should instagram', () => {
      const profile = 'instagram';
      const profileId = 'javascript.js';
      const desktop = `https://instagram.com/${profileId}`;
      const mobile = `https://m.instagram.com/${profileId}`;
      testProfile(profile, profileId, desktop, mobile);
    });

    it('should patreon', () => {
      const profile = 'patreon';
      const profileId = 'gkucmierz';
      const desktop = `https://patreon.com/${profileId}`;
      testProfileDesktop(profile, profileId, desktop);
    });

    it('should github', () => {
      const profile = 'github';
      const profileId = 'gkucmierz';
      const desktop = `https://github.com/${profileId}`;
      testProfileDesktop(profile, profileId, desktop);
    });

    it('should medium', () => {
      const profile = 'medium';
      const profileId = 'grzegorzkumierz';
      const desktop = `https://medium.com/@${profileId}`;
      testProfileDesktop(profile, profileId, desktop);
    });

    it('should dribble', () => {
      const profile = 'dribble';
      const profileId = 'gkucmierz';
      const desktop = `https://dribble.com/${profileId}`;
      testProfileDesktop(profile, profileId, desktop);
    });

    it('should behance', () => {
      const profile = 'behance';
      const profileId = 'grzegorzkumierz';
      const desktop = `https://behance.net/${profileId}`;
      testProfileDesktop(profile, profileId, desktop);
    });
  });

  describe('config', () => {
    describe('usePredefinedProfiles', () => {
      it('should set usePredefinedProfiles = true', () => {
        sl = new SocialLinks({ usePredefinedProfiles: true });
        expect(sl.getLink('linkedin', 'gkucmierz')).toBe('https://linkedin.com/in/gkucmierz');
      });

      it('should set usePredefinedProfiles = false', () => {
        sl = new SocialLinks({ usePredefinedProfiles: false });
        expect(() => sl.getLink('linkedin', 'gkucmierz')).toThrowError();
      });
    });

    describe('trimInput', () => {
      it('should set trimInput as default', () => {
        sl = new SocialLinks();
        const whitespace = [' ', '\t', '\n'].join('');
        expect(sl.isValid('linkedin', `${whitespace}http://www.linkedin.com/in/gkucmierz${whitespace}`)).toBeTruthy();
      });

      it('should trim isValid', () => {
        sl = new SocialLinks({ trimInput: true });
        const whitespace = [' ', '\t', '\n'].join('');
        expect(sl.isValid('linkedin', `${whitespace}http://www.linkedin.com/in/gkucmierz${whitespace}`)).toBeTruthy();
      });

      it('should not trim isValid', () => {
        sl = new SocialLinks({ trimInput: false });
        const whitespace = [' ', '\t', '\n'].join('');
        expect(sl.isValid('linkedin', `${whitespace}http://www.linkedin.com/in/gkucmierz${whitespace}`)).toBeFalsy();
      });
    });

    describe('allowQueryParams', () => {
      it('should not allowQueryParams as default', () => {
        const params = '?param=123&param2=abc';
        expect(sl.isValid('linkedin', `http://www.linkedin.com/in/gkucmierz${params}`)).toBeFalsy();
      });

      it('should allowQueryParams in link', () => {
        sl = new SocialLinks({ allowQueryParams: true });
        const params = '?param=123&param2=abc';
        expect(sl.isValid('linkedin', `http://www.linkedin.com/in/gkucmierz${params}`)).toBeTruthy();
      });

      it('should not allowQueryParams in link', () => {
        sl = new SocialLinks({ allowQueryParams: false });
        const params = '?param=123&param2=abc';
        expect(sl.isValid('linkedin', `http://www.linkedin.com/in/gkucmierz${params}`)).toBeFalsy();
      });

      it('should sanitize query params with allowQueryParams = true', () => {
        sl = new SocialLinks({ allowQueryParams: true });
        const params = '?param=123&param2=abc';
        const sanitized = sl.sanitize('linkedin', `http://www.linkedin.com/in/gkucmierz${params}`);
        expect(sanitized).toBe('https://linkedin.com/in/gkucmierz');
      });

      it('should not sanitize query params with allowQueryParams = false', () => {
        sl = new SocialLinks({ allowQueryParams: false });
        const params = '?param=123&param2=abc';
        expect(() => sl.sanitize('linkedin', `http://www.linkedin.com/in/gkucmierz${params}`)).toThrowError();
      });
    });
  });

  describe('profiles', () => {
    it('should clean profiles', () => {
      sl = new SocialLinks({ usePredefinedProfiles: false });
      expect(() => sl.getLink('linkedin', 'gkucmierz')).toThrowError();
    });

    it('should add profile', () => {
      const name = 'test';
      sl.addProfile(name, [{ match: '(.{3})', group: 1, pattern: '-{PROFILE_ID}-' }]);
      expect(sl.isValid(name, '123')).toBeTruthy();
      expect(sl.sanitize(name, '123')).toBe('-123-');
    });
  });

});
