import { Router } from 'express';

interface Controller {
  private path: string;
  router: Router;
}

export default Controller;