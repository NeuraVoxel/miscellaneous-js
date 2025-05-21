FROM envoyproxy/envoy:v1.25.0

COPY ./envoy.yaml /etc/envoy/envoy.yaml

CMD /usr/local/bin/envoy -c /etc/envoy/envoy.yaml -l info --log-path /tmp/envoy_info.log