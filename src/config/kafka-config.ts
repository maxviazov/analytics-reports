export default () => ({
  kafka: {
    /**
     * List of Kafka brokers. If not specified in the environment variables, defaults to 'localhost:9092'.
     * @example ['localhost:9092', 'broker:9092']
     */
    brokers: process.env.KAFKA_BROKERS
      ? process.env.KAFKA_BROKERS.split(',')
      : ['localhost:9092'],

    /**
     * Client ID for the Kafka client. If not specified in the environment variables, defaults to 'default-client-id'.
     * @example 'my-client-id'
     */
    clientId: process.env.KAFKA_CLIENT_ID || 'default-client-id',

    /**
     * Group ID for the Kafka consumer group. If not specified in the environment variables, defaults to 'default-group-id'.
     * @example 'my-group-id'
     */
    groupId: process.env.KAFKA_GROUP_ID || 'default-group-id',

    /**
     * Default topic to be used for Kafka messages. If not specified in the environment variables, defaults to 'default-topic'.
     * @example 'my-topic'
     */
    topic: process.env.KAFKA_TOPIC || 'default-topic',
  },
});
