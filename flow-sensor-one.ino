int flowPin = 2;
double flowRate;
volatile int count;
void setup() {
  // put your setup code here, to run once:
  pinMode(flowPin, INPUT);
  attachInterrupt(0, Flow, RISING);

}

void loop() {
  // put your main code here, to run repeatedly:
  count = 0;
  interrupts();
  delay(1000);
  noInterrupts();

  flowRate = (count*2.25);
  Serial.println(flowRate);

}

void Flow() {
  count ++;
}