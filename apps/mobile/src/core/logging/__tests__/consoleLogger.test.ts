import { createConsoleLogger } from '../consoleLogger';

describe('createConsoleLogger', () => {
  it('respects minLevel', () => {
    const debug = jest.spyOn(console, 'debug').mockImplementation(() => undefined);
    const info = jest.spyOn(console, 'info').mockImplementation(() => undefined);

    const logger = createConsoleLogger({ minLevel: 'info', namespace: 'test' });
    logger.debug('hidden');
    logger.info('visible');

    expect(debug).not.toHaveBeenCalled();
    expect(info).toHaveBeenCalled();

    debug.mockRestore();
    info.mockRestore();
  });
});
