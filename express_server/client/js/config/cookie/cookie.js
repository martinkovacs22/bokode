export class CookieHandler {
    add(name, value) {
      document.cookie = name + "=" + value + "; path=/";
    }
  
    get(name) {
      const cookieName = name + "=";
      const cookies = document.cookie.split(";");
  
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === " ") {
          cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
          return cookie.substring(cookieName.length, cookie.length);
        }
      }
  
      return null;
    }
  
    set(name, value) {
      this.add(name, value);
    }
  
    remove(name) {
      document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  }
