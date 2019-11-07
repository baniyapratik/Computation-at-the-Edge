import os
import argparse
from communication_service import create_app


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-c',
                        '--config',
                        metavar='config',
                        dest='config',
                        help='Specify the config to load')
    parser.add_argument('-p',
                        '--port',
                        metavar='port',
                        dest='port', default='5000',
                        help='Server port')
    args = parser.parse_args()

    current_dir = os.path.dirname(os.path.abspath(__file__))

    if args.config:
        config = args.config
    else:

        if os.environ.get('INS_MODE'):
            config = os.environ.get('INS_MODE')
        else:
            print('Environment variable "INS_MODE" is not set, trying default config...')
            config = 'config'

    os.environ['INS_MODE'] = config
    os.environ['HOST_PORT'] = args.port
    if not os.path.exists(os.path.join(current_dir, config + '.py')):
        raise EnvironmentError('Cannot find "{}.py" in the current directory, '
                               'app initialization failed.'
                               .format(config))
    else:
        print(config)
        app = create_app(config)
        app.run(host=app.config['SERVER_LISTENING'], port=int(args.port), debug=app.config['DEV_MODE'], threaded=True)
