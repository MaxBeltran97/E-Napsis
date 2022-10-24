class Config(object):
    SECRET_KEY = 'f0faa2bed03b28e48544762d760aa169'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = False

class DevelopmentConfig(Config):
    """
    Development configurations
    """
    # SQLALCHEMY_DATABASE_URI = "mysql://root:fideosconsalsa1@localhost/napsis"
    SQLALCHEMY_DATABASE_URI = "mysql://Diego:admin@localhost/napsis"
    SQLALCHEMY_POOL_RECYCLE = 300
    SQLALCHEMY_POOL_SIZE = 2000
    SQLALCHEMY_POOL_TIMEOUT = 320
    DEBUG = True
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    REDIS_URL = "redis://@redis:6379/0"

class TestingConfig(Config):
    """
    Testing configurations
    """
    SQLALCHEMY_DATABASE_URI = "mysql://Diego:fideosconsalsa_2@localhost/napsis"
    SQLALCHEMY_POOL_RECYCLE = 300
    SQLALCHEMY_POOL_SIZE = 2000
    SQLALCHEMY_POOL_TIMEOUT = 320
    TESTING = True 
    DEBUG = True
    REDIS_URL = "redis://@redis:6379/0"

class ProductionConfig(Config):
    """
    Production configurations
    """
    SQLALCHEMY_DATABASE_URI = "mysql://root:fideosconsalsa1@localhost/napsis"
    SQLALCHEMY_POOL_RECYCLE = 300
    SQLALCHEMY_POOL_SIZE = 2000
    SQLALCHEMY_POOL_TIMEOUT = 320
    REDIS_URL = "redis://@redis:6379/0"

app_config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig
}
